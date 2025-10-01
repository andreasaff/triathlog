import configuration from '$lib/config/config.json'

export interface Config {
    type: string
    background: string
    border: string
}

export const config: Config[] = configuration;