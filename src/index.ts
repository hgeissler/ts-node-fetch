import fetch from 'node-fetch'

interface ApiResult<T> {
  data: T
}

interface User {
  id: number
  email: string
}

function isApiResult(obj: any): obj is ApiResult<unknown> {
  return 'data' in obj
}

function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'number' && typeof obj.email === 'string'
}

function assertUserApiResult(obj: any): asserts obj is ApiResult<User> {
  if (!isApiResult(obj) && isUser(obj.data)) {
    throw new Error('not a valid API result')
  }
}

async function fetchUser(id: number): Promise<ApiResult<User>> {
  const response = await fetch(`https://reqres.in/api/users/${id}`)
  const json: unknown = await response.json()
  assertUserApiResult(json)
  return json
}

fetchUser(2).then((result) => console.log(result.data.email))
