import people from "./controllers/people"

interface Routes {
  [route: string]: Function
}

export default (path: string): Function => {
  const routes: Routes = {
    "/people-DELETE": people.delete
  }
  return routes[path]
}
