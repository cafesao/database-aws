export default function verifyKey(key: string) {
  const keySecret = process.env.KEY
  if (key !== keySecret) {
    return false
  }
  return true
}
