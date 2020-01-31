import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef
} from "react";
import { firestore } from "../../firebase";
import { AuthContext } from "../authProvider";

export const UnpublishedContext = createContext();

function UnpublishedProvider(props) {
  const { user } = useContext(AuthContext);
  const componentDidMount = useRef(false);
  const [rotas, setRotas] = useState(null);
  const [rotasLoading, setRotasLoading] = useState(true);

  useEffect(() => {
    if (componentDidMount.current) {
      return firestore.collection("unpublished").onSnapshot(snapshot => {
        const rotas = snapshot.docs.map(doc => {
          const data = doc.data();
          const rota = { id: doc.id, ...data };
          rota.date = data.date.toDate();
          return rota;
        });
        setRotas(rotas);
        setRotasLoading(false);
      });
    }
    componentDidMount.current = true;
  }, [user]);

  const values = {
    rotas,
    rotasLoading,
    setRotasLoading
  };

  return (
    <UnpublishedContext.Provider value={values}>
      {props.children}
    </UnpublishedContext.Provider>
  );
}

export default UnpublishedProvider;
