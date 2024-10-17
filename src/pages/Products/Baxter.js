
import CardInfo from "../../components/CardsInfo";
import { useNavigate} from "react-router-dom";

const title1 = "Baxter PrisMax CRRT Machine";
const description = `The PrisMax System is designed to give healthcare
professionals more confidence in the delivery of continuous
renal replacement therapy (CRRT) and therapeutic plasma
exchange (TPE) therapies. The PrisMax system is designed 
to provide individualized therapies for critically ill patients in 
the intensive care unit (ICU). We collaborated with critical
care experts to develop the next generation of acute care
technology by asking more than 650 ICU healthcare
professionals from more than 50 ICUs around the world how
we could help address some of their greatest challenges...`;

const Baxter = () => {
const navigate = useNavigate();
const handleViewDetails = () => {
    navigate('/products/baxter/details')
}
  return (
    <div className="flex gap-4">
      <CardInfo title={title1} description={description} handleViewDetails = {handleViewDetails} />
      <CardInfo title={title1} description={description} />
    </div>
  );
};

export default Baxter;
