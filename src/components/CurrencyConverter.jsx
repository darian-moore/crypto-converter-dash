import { useState } from "react"
import axios from 'axios'

import ExchangeRate from "./ExchangeRate"

const CurrencyConverter = () => {
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']

    const [primaryCurrency, setPrimaryCurrency] = useState('BTC')
    const [secondaryCurrency, setSecondaryCurrency] = useState('BTC')
    const [amount, setAmount] = useState(1)
    const [exchangeRate, setExchangeRate] = useState(0)
    const [primaryCurrencyExchanged, setPrimaryCurrencyExchanged] = useState('BTC')
    const [secondaryCurrencyExchanged, setSecondaryCurrencyExchanged] = useState('BTC')
    const [result, setResult] = useState(0)

    const convert = () => {
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {to_currency: secondaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', from_currency: primaryCurrency},
            headers: {
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
                'x-rapidapi-key': 'c94140f8e8mshfdd932c2cc11d58p166129jsn76cde0e7ea5d' //process.env.REACT_APP_RAPID_API_KEY
            }
        };

        axios.request(options).then((response) => {
            setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
            setPrimaryCurrencyExchanged(primaryCurrency)
            setSecondaryCurrencyExchanged(secondaryCurrency)
        }).catch((error)=> {
            console.error(error);
        });
    }

    return (
        <div className='currency-converter'>
            <h2>Currency Converter</h2>

            <div className='input-box'>
                <table>
                    <tbody>
                        <tr>
                            <td>Primary Currency</td>
                            <td>
                                <input
                                    type="number"
                                    name="currency-amount-1"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </td>
                            <td>
                                <select
                                    name="currency-option-1"
                                    className='currency-options'
                                    value={primaryCurrency}
                                    onChange={(e) => setPrimaryCurrency(e.target.value)}
                                >
                                    {currencies.map((currency, _index) => (
                                        <option key={_index} value={currency}>{currency}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>Secondary Currency</td>
                            <td>
                                <input
                                    type="number" 
                                    name="currency-amount-2"
                                    value={result}
                                    disabled={true}
                                />
                            </td>
                            <td>
                                <select
                                    name="currency-option-2"
                                    className='currency-options'
                                    value={secondaryCurrency}
                                    onChange={(e) => setSecondaryCurrency(e.target.value)}
                                >
                                    {currencies.map((currency, _index) => (
                                        <option key={_index} value={currency}>{currency}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button className='convert-button' onClick={convert}>
                    Convert
                </button>

            </div>

            <ExchangeRate 
                exchangeRate={exchangeRate}
                primaryCurrencyExchanged={primaryCurrencyExchanged}
                secondaryCurrencyExchanged={secondaryCurrencyExchanged}
            />
        </div>
    )
}

export default CurrencyConverter
