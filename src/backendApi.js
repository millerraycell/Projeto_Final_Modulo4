export async function apiCall(state, city){
    const data = await fetch(`https://private-9e061d-piweb.apiary-mock.com/venda?state=${state}&city=${city}`)
    const finalData = await data.json();

    return finalData
}