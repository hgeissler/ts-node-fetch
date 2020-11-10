import fetch from 'node-fetch'

interface ApiResult<T> {
  data: T
}

interface User {
  id: number
  email: string
}

/*
is:
Using the type predicate "obj is ApiResult<unknown>" 
(instead of just use boolean for the return type) 
if the function returns true, the TypeScript-compiler will narrow the type to ApiResult<>
in any block guarded by a call to the function.
*/

/*
unknown:
(is like any type)
This is useful for APIs that want to signal “this can be any value, so you must perform some type of checking before you use it”. This forces users to safely introspect returned values.
*/

function isApiResult(obj: any): obj is ApiResult<unknown> {
  return 'data' in obj
}

function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'number' && typeof obj.email === 'string'
}

/*
asserts:
asserts condition says that whatever gets passed into the condition parameter
must be true if the assert returns (because otherwise it would throw an error). That means that for the rest of the scope, that condition must be truthy.
*/

function assertUserApiResult(obj: any): asserts obj is ApiResult<User> {
  if (!isApiResult(obj) && isUser(obj.data)) {
    throw new Error('not a valid API result')
  }
}

//ASYNC
async function fetchUser(id: number): Promise<ApiResult<User>> {
  const response = await fetch(`https://reqres.in/api/users/${id}`)
  const json: unknown = await response.json()
  assertUserApiResult(json)
  return json
}

//PROMISE CHAIN
function fetchUser2(id: number): Promise<ApiResult<User>> {
  return fetch(`https://reqres.in/api/users/${id}`)
    .then((response) => response.json())
    .then((json) => {
      assertUserApiResult(json)
      return json
    })
}

fetchUser(2).then((result) => console.log(result.data.email))

fetchUser2(3).then((result) => console.log(result.data.email))
