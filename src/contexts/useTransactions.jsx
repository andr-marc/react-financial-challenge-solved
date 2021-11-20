import axios from 'axios';
import React from 'react'


const TransactionsContext = React.createContext();


export function TransactionsProvider({ children }) {

  const [transactions, setTransactions] = React.useState([]);
  const [requestData, setRequestData] = React.useState(new Date());



  React.useEffect(() => {
    // TO DO - Implemente aqui um get para quando carregar a tela, trazer a listagem de transacoes
    axios.get('/api/transactions').then(({data}) => {
      setTransactions(data.transactions);
    });

  }, [requestData]);


  async function createTransaction(transactionInput) {
    // TO DO - Implemente aqui o post para salvar transacao, endpoint POST /transactions
    const transaction = {
      title: transactionInput.title, 
      amount: transactionInput.amount, 
      category: transactionInput.category, 
      type: transactionInput.type
    };
    
    axios.post('/api/transactions', transaction ).then(() => {
      setRequestData(new Date());
    });  
  }


  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  );


}

export function useTransactions() {
  const context = React.useContext(TransactionsContext);

  return context;
}