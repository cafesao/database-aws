function verifyType(value: any) {
  const types = {
    string: "S",
    number: "N",
    stringArray: "SS",
    numberArray: "NS"
  } as { [key: string]: string }
  if (Array.isArray(value)) {
    return types[`${typeof value[0]}Array`]
  }
  return types[typeof value]
}

export default function prepareObj(body: any) {
  const keys = Object.keys(body)
  const length = keys.length
  const obj: any = {}
  for (let i = 0; i < length; i++) {
    const key = keys[i]
    obj[key] = {
      [verifyType(body[key])]: body[key]
    }
  }
  return obj
}
