import { web3 } from '@project-serum/anchor';
import { USDC_PUBKEY, WSOL_PUBKEY } from '../configs/pubkeys.config.js';
import { TokenInformation } from '../configs/token-list.config.js';
import { PayRequest } from '../models/pay-request.model.js';
import { createTransferIx } from '../services/builders/transfer-ix.builder.js';
import { createSwapIx } from '../services/swaps/create-swap-ix.service.js';
import { createConnection } from '../utils/connection.util.js';
import { createAccountIx } from '../services/builders/create-account-ix.builder.js';
import { PaymentTransactionRequest } from '../models/payment-transaction-request.model.js';

// const createPayTransaction = async (
//     payRequest: PaymentTransactionRequest
// ): Promise<web3.Transaction> => {
//     let connection: web3.Connection
//     let transaction: web3.Transaction
//     let receivingQuantity: number
//     var swapIxs: web3.TransactionInstruction[] = []
//     var transferIxs: web3.TransactionInstruction[] = []
//     var createIxs: web3.TransactionInstruction[] = []

//     try {
//         connection = createConnection()
//     } catch (error) {
//         throw error as Error
//     }

//     const blockhash = await connection.getLatestBlockhash()

//     switch (payRequest.transactionType) {
//         case 'blockhash':
//             transaction = new web3.Transaction({
//                 feePayer: new web3.PublicKey(payRequest.feePayer),
//                 blockhash: blockhash.blockhash,
//                 lastValidBlockHeight: blockhash.lastValidBlockHeight,
//             })
//         case 'nonce':
//             transaction = new web3.Transaction({
//                 feePayer: new web3.PublicKey(payRequest.feePayer),
//                 blockhash: blockhash.blockhash,
//                 lastValidBlockHeight: blockhash.lastValidBlockHeight,
//             })
//     }

//     const receivingTokenInformation =
//         await TokenInformation.queryTokenInformationFromPubkey(
//             new web3.PublicKey(payRequest.feePayer),
//             connection
//         )

//     switch (payRequest.amountType) {
//         case 'quantity':
//             receivingQuantity = payRequest.receivingAmount
//         case 'size':
//             receivingQuantity = receivingTokenInformation.convertSizeToQuantity(
//                 payRequest.receivingAmount
//             )
//     }

//     if (payRequest.sendingToken != payRequest.receivingToken) {
//         swapIxs = await createSwapIx({
//             provider: 'jupiter',
//             quantity: receivingQuantity,
//             fromMint: payRequest.sendingToken,
//             toMint: payRequest.receivingToken,
//             swapingWallet: payRequest.feePayer,
//         })
//     }

//     transferIxs = await createTransferIx(
//         payRequest.sender,
//         payRequest.receiver,
//         receivingTokenInformation,
//         receivingQuantity,
//         payRequest.createAta,
//         connection
//     )

//     createIxs = createAccountIx(USDC_PUBKEY, USDC_PUBKEY)

//     transaction = transaction.add(...swapIxs, ...transferIxs, ...createIxs)

//     return transaction
// }

const createSamplePayRequest = (): PayRequest => {
    const payRequest = PayRequest.parse({
        receiver: '5rPoLqhSC2VnMULYfzYX4712GEFNFv8nof6K6nP7GX8E',
        sender: 'ExvbioyTPuFivNJjPcYiCbHijTWPAHzfRXHnAmA4cyRx',
        sendingToken: USDC_PUBKEY.toBase58(),
        receivingToken: USDC_PUBKEY.toBase58(),
        feePayer: 'ExvbioyTPuFivNJjPcYiCbHijTWPAHzfRXHnAmA4cyRx',
        receivingAmount: '10',
        amountType: 'size',
        transactionType: 'blockhash',
        createAta: true,
    });

    return payRequest;
};

export { PayRequest, createSamplePayRequest };
