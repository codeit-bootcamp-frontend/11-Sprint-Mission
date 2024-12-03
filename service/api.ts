import axios from 'axios'

interface Params {
  page: string
  pageSize: string
  orderBy: string
  keyword?: string
}

const apiItem = async ({ page, pageSize, orderBy, keyword }: Params) => {
  const queryParams = new URLSearchParams({ page, pageSize, orderBy })
  if (keyword) queryParams.append('keyword', keyword)
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}?${queryParams}`)
    if (res.status === 200) {
      return res.data
    }
  } catch (e) {
    console.log(e)
  }
}

interface PreductType {
  id: number
  keyword?: string
}

const getPreduct = async ({ id, keyword }: PreductType) => {
  const queryParams = new URLSearchParams()
  if (keyword) queryParams.append('keyword', keyword)
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${id}?${queryParams}`)
    if (res.status === 200) {
      const newData = {
        ...res.data,
        price: `${res.data.price.toLocaleString()}원`,
        updatedAt: res.data.updatedAt.substring(0, 10),
      }
      return newData
    }
  } catch (e) {
    console.log(e)
  }
}

export { apiItem, getPreduct }
