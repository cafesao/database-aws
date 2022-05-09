import people from "./controllers/people"

interface Routes {
  [route: string]: Function
}

export default (path: string, method: string): Function => {
  const routes: Routes = {
    "/people-GET": people.get,
    "/people-POST": people.create,
    "/people-PATCH": people.update,
    "/people-DELETE": people.delete
  }
  return routes[`/${path}-${method}`]
}
