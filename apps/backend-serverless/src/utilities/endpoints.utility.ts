// url to request access token as described here: https://shopify.dev/apps/auth/oauth/getting-started#step-5-get-an-access-token
export const accessTokenEndpoint = (shop: string, authCode: string) => {
    const clientId = process.env.SHOPIFY_CLIENT_ID;
    const clientSecret = process.env.SHOPIFY_SECRET_KEY;
    return `https://${shop}/admin/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${authCode}`;
};

export const buildPaymentTransactionRequestEndpoint = (
    receiver: string,
    sender: string,
    receivingToken: string,
    sendingToken: string,
    feePayer: string,
    receivingAmount: string,
    amountType: string,
    transactionType: string,
    createAta: string,
    singleUseNewAcc: string,
    singleUsePayer: string
) => {
    const TRANSACTION_REQUEST_SERVER_URL = process.env.TRANSACTION_REQUEST_SERVER_URL;

    if (TRANSACTION_REQUEST_SERVER_URL == null) {
        throw new Error('Missing TRANSACTION_REQUEST_SERVER_URL environment variable.');
    }

    return `${TRANSACTION_REQUEST_SERVER_URL}/pay?receiver=${receiver}&sender=${sender}&receivingToken=${receivingToken}&sendingToken=${sendingToken}&feePayer=${feePayer}&receivingAmount=${receivingAmount}&amountType=${amountType}&transactionType=${transactionType}&createAta=${createAta}&singleUseNewAcc=${singleUseNewAcc}&singleUsePayer=${singleUsePayer}`;
};

export const buildRefundTransactionRequestEndpoint = (
    receiver: string,
    sender: string,
    receivingToken: string,
    sendingToken: string,
    feePayer: string,
    receivingAmount: string,
    amountType: string,
    transactionType: string,
    createAta: string
) => {
    const TRANSACTION_REQUEST_SERVER_URL = process.env.TRANSACTION_REQUEST_SERVER_URL;

    if (TRANSACTION_REQUEST_SERVER_URL == null) {
        throw new Error('Missing TRANSACTION_REQUEST_SERVER_URL environment variable.');
    }

    return `${TRANSACTION_REQUEST_SERVER_URL}/pay?receiver=${receiver}&sender=${sender}&receivingToken=${receivingToken}&sendingToken=${sendingToken}&feePayer=${feePayer}&receivingAmount=${receivingAmount}&amountType=${amountType}&transactionType=${transactionType}&createAta=${createAta}`;
};

export const buildCoinGeckoUsdcPriceEndpoint = (coinId: string) => {
    const baseCoinGeckoApiUrl = 'https://api.coingecko.com/api/v3';
};
