import {Account} from '@unique-nft/sr25519'
import Sdk from '@unique-nft/sdk'

import * as dotenv from 'dotenv'
import assert from 'node:assert'

dotenv.config()

const POLKADOT_MNEMONIC = process.env.POLKADOT_MNEMONIC
assert(POLKADOT_MNEMONIC, 'POLKADOT_MNEMONIC env var is required')

const createNFTCollection = async (sdk: Sdk): Promise<number> => {
  const collectionCreationResult = await sdk.collection.create({
    name: 'Threedium collection',
    description: 'A collection for the Threedium project - a 3D Non-Fungible Token',
    tokenPrefix: '3DIUM',
    schema: {
      schemaName: 'unique',
      schemaVersion: '1.0.0',
      coverPicture: {
        ipfsCid: 'QmZ6SjW1rG4Pizb6zkam9SyCgF872AUQkpzyEZAC9WkyCs',
      },
      image: {
        urlTemplate: 'https://ipfs.unique.network/ipfs/{infix}',
      },
      spatialObject: {
        urlTemplate: 'https://ipfs.unique.network/ipfs/{infix}',
        format: 'glb',
      },
      attributesSchemaVersion: '1.0.0',
      attributesSchema: {
        0: {
          name: {_: 'url'},
          type: 'url',
        },
        1: {
          name: {_: 'Studio'},
          type: 'string',
        },
        2: {
          name: {_: 'Website'},
          type: 'url',
        }
      },
    }
  })

  if (!collectionCreationResult.parsed) {
    throw collectionCreationResult.error
  }

  const collectionId = collectionCreationResult.parsed.collectionId
  return collectionId
}

const mintNFT = async (sdk: Sdk, collectionId: number): Promise<number> => {
  const mintResult = await sdk.token.create({
    collectionId,
    data: {
      image: {
        ipfsCid: 'QmZ6SjW1rG4Pizb6zkam9SyCgF872AUQkpzyEZAC9WkyCs',
      },
      spatialObject: {
        ipfsCid: 'QmeNYNM1egmoo8zz1dEa3tfvfrF3W2G98ccwS8CXU1oeXw',
      },
      encodedAttributes: {
        0: {_: 'https://dist.unlimited3d.com/dists/52851/6d24ab91-800b-4dbc-8259-e2d93f5e1513'},
        1: {_: 'Threedium',},
        2: {_: 'https://threedium.io',},
      }
    }
  })

  if (!mintResult.parsed) {
    throw mintResult.error
  }

  const tokenId = mintResult.parsed.tokenId
  return tokenId
}

export const REST_URLS = {
  opal: 'https://rest.unique.network/opal/v1',
  unique: 'https://rest.unique.network/unique/v1',
  quartz: 'https://rest.unique.network/quartz/v1',
}

const main = async () => {
  const network = 'opal'
  const baseUrl = REST_URLS[network]
  console.log(`Using network "${network}" with rest url ${baseUrl}`)

  // init substrate account and sdk
  const account = Account.fromUri(POLKADOT_MNEMONIC)
  const sdk = new Sdk({baseUrl, account})

  // create collection (Non-Fungible Token type)
  const collectionId = await createNFTCollection(sdk)
  console.log(`Created collection ${collectionId}: ${sdk.options.baseUrl}/collections?collectionId=${collectionId}`)

  // mint Non-Fungible Token
  const tokenId = await mintNFT(sdk, collectionId)
  console.log(`Minted token ${collectionId}/${tokenId}: ${sdk.options.baseUrl}/tokens?collectionId=${collectionId}&tokenId=${tokenId}`)
}

main()
  .catch((error) => {
    console.error(error)
    if (error.details) {
      console.dir(error.details, {depth: 100})
    }
  })
