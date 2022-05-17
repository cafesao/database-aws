import people from "./controllers/people"

interface Routes {
  [route: string]: Function
}

export default (path: string): Function => {
  const routes: Routes = {
    "/people": people.create
  }
  return routes[path]
}
