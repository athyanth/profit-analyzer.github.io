function CalculateBrokerage() {
    const buyQuantity = parseFloat(document.getElementById('BuyQuantity').value);
    const buyPrice = parseFloat(document.getElementById('BuyPrice').value);
    const sellQuantity = document.getElementById('SellQuantity').value ?
        parseFloat(document.getElementById('SellQuantity').value) : 0;
    const sellPrice = document.getElementById('SellPrice').value ?
        parseFloat(document.getElementById('SellPrice').value) : 0;
    if (buyQuantity && Number.isInteger(buyQuantity) && buyPrice && (sellPrice || sellPrice === 0)) {
        document.getElementById('result').style.display = 'block'
        const totBuyPrice = buyQuantity * buyPrice;
        const totSellPrice = sellQuantity * sellPrice;
        const buyBrokerage = (totBuyPrice > 55555.0) ?
            RoundOffValue(totBuyPrice * 0.00027) :
            (totBuyPrice > 600) ? 15 : RoundOffValue(totBuyPrice * 0.025);
        const sellBrokerage = (totSellPrice > 55555.0) ?
            RoundOffValue(totSellPrice * 0.00027) :
            (totSellPrice > 600) ? 15 : RoundOffValue(totSellPrice * 0.025);
        const totalBrokerage = buyBrokerage + sellBrokerage;
        const payOut = totSellPrice - totBuyPrice;
        const etc = RoundOffValue((totBuyPrice + totSellPrice) * 0.000034);
        const sebi = RoundOffValue((totBuyPrice + totSellPrice) * 0.000001);
        const gst = RoundOffValue((totalBrokerage + etc + sebi) * 0.09);
        const totalGST = gst * 2;
        const sd = RoundOffValue(totBuyPrice * 0.0000325);
        const stt = RoundOffValue(totSellPrice * 0.00025);
        const totalDed = RoundOffValue(totalBrokerage + etc + sebi + totalGST + stt + sd);
        const netAmount = payOut - totalDed;
        document.getElementById('PayOut').value = payOut;
        document.getElementById('Brokerage').value = totalBrokerage;
        document.getElementById('ETC').value = etc;
        document.getElementById('SEBI').value = sebi;
        document.getElementById('SGST').value = gst;
        document.getElementById('CGST').value = gst;
        document.getElementById('GST').value = totalGST;
        document.getElementById('SD').value = sd;
        document.getElementById('STT').value = stt;
        document.getElementById('TotalDeduction').value = totalDed;
        document.getElementById('NetAmount').value = netAmount;
        document.getElementById('PayLabel').innerHTML = (netAmount > 0) ? 'Payout Obligation' : 'Pay in Obligation';
    }
}

function RoundOffValue(val) {
    return Math.round((val + Number.EPSILON) * 10000) / 10000
}

$(window).on('load', function () {
    $('#BuyQuantity').keyup(function () {
        $('#SellQuantity').val(this.value);
    });
});