import './TxnForm.css';
import TxnTable from './formComponents/TxnTable';

const TxnForm = ({ transactions }) => {
    return (
        <div className='txnForm-main'>
            <TxnTable transactions={transactions}/>
        </div>
    );
};

export default TxnForm;