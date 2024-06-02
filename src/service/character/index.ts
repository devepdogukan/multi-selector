import { AxiosRequestConfig } from 'axios'
import instance from '~/api/request'
import { ResponseInfo } from '~/service/type'

export type Character = {
    created: string
    gender: string
    episode: string[]
    id: number
    image: string
    name: string
    species: string
    status: string
    type: string
    url: string
    origin: {
        name: string
        url: string
    }
    location: {
        name: string
        url: string
    }
}

export interface CharacterResponse extends ResponseInfo {
    results: Character[]
}

class CharacterService {
    async getAll(options?: AxiosRequestConfig) {
        const data = await instance<CharacterResponse>(
            'https://rickandmortyapi.com/api/character/',
            options
        )

        return data
    }

    async getFiltered(
        queryParams: { [key: string]: string | boolean | number },
        options?: AxiosRequestConfig
    ) {
        const data = await instance<CharacterResponse>(
            'https://rickandmortyapi.com/api/character/',
            {
                ...options,
                params: {
                    ...options?.params,
                    ...queryParams,
                },
            }
        )

        return data
    }
}

export default new CharacterService()
