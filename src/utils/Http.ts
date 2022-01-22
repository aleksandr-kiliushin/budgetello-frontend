interface RequestOptions extends RequestInit {
  headers: {
    Authorization: string
    'Content-Type': 'application/json'
  }
}
interface RequestDataWithoutPayload {
  url: string
}
interface RequestDataWithPayload extends RequestDataWithoutPayload {
  payload: Record<string, unknown>
}

class Http {
  private static get requestOptions(): RequestOptions {
    return {
      headers: {
        Authorization: 'Bearer ' + localStorage.authToken,
        'Content-Type': 'application/json',
      },
    }
  }
  private static getFullUrl(url: string): string {
    const backendUrlStart =
      process.env.MODE === 'production'
        ? 'https://finances-app-backend.herokuapp.com:443'
        : 'http://localhost:3080'
    return backendUrlStart + url
  }

  static async delete({ url }: RequestDataWithoutPayload): Promise<object> {
    const fullUrl = this.getFullUrl(url)
    const response = await fetch(fullUrl, {
      ...this.requestOptions,
      method: 'DELETE',
    })
    return await response.json()
  }
  static async get({ url }: RequestDataWithoutPayload): Promise<object> {
    const fullUrl = this.getFullUrl(url)
    const response = await fetch(fullUrl, this.requestOptions)
    return await response.json()
  }
  static async patch({ payload, url }: RequestDataWithPayload): Promise<object> {
    const fullUrl = this.getFullUrl(url)
    const response = await fetch(fullUrl, {
      ...this.requestOptions,
      body: JSON.stringify(payload),
      method: 'PATCH',
    })
    return await response.json()
  }
  static async post({ payload, url }: RequestDataWithPayload): Promise<object> {
    const fullUrl = this.getFullUrl(url)
    const response = await fetch(fullUrl, {
      ...this.requestOptions,
      body: JSON.stringify(payload),
      method: 'POST',
    })
    return await response.json()
  }
}

export default Http
