type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface RequestOptions extends RequestInit {
  method?: RequestMethod
  headers?: Record<string, string>
  body?: any
  params?: Record<string, string | number>
}

export const request = async <T = any>(
  url: string,
  options: RequestOptions = {},
): Promise<T> => {
  const { method = 'GET', headers = {}, body, params, ...rest } = options

  let finalUrl = url

  if (params) {
    const query = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      query.append(key, String(value))
    })
    finalUrl += `?${query.toString()}`
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  }

  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body)
  }

  const response = await fetch(finalUrl, fetchOptions)

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Request failed: ${response.status} ${response.statusText} - ${errorText}`,
    )
  }

  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return response.json()
  }

  return response.text() as unknown as T
}
