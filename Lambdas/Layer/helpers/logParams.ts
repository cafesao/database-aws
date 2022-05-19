export default function logParams(nameFun: string, ...params: any[]) {
  console.log("[Lambda - Layers] Log Params")
  console.log("[Lambda - Layers] Function Name:", nameFun)
  params.map((param: any) => {
    console.log(param)
  })
}
