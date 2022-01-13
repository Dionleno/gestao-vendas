
const successfulStatus = [200, 201, 202, 204];

const ValidateResponse = PromiseApi => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await PromiseApi()
            if (response) {
                const { data } = response
                if (response.status === 401) {
                    window.localStorage.clear();
                    reject(data.error)
                }
                const status = successfulStatus.includes(response.status)
                if (!status) reject(data.error)
                resolve(data)
            } else {
                reject()
            }
        } catch (error) {
            reject(error)
        }
    })
}

export { ValidateResponse }