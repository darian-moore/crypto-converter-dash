const ExchangeRate = ({ exchangeRate, primaryCurrencyExchanged, secondaryCurrencyExchanged }) => {
    return (
        <div className='exchange-rate'>
            <h3>Exchange Rate</h3>
            <h1>${exchangeRate}</h1>
            <p>{primaryCurrencyExchanged} to {secondaryCurrencyExchanged}</p>
        </div>
    )
}

export default ExchangeRate
