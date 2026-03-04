const URL = 'https://api.github.com/kanom303/web'
export default function FetchPage() {


    const response = await fetch(URL)
    const response = await Response.json()
    console.log("Response:", date)


    return (
        <div>
            <h1>Fetch</h1>
            <div className="">

            </div>
        </div>
        
    )






}