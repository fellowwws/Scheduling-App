import React, { useContext, Fragment } from "react";
import { Container } from "reactstrap";
import { AuthContext } from "../providers/authProvider";
import { PublishedContext } from "../providers/rota/publishedProvider";
import { UnpublishedContext } from "../providers/rota/unpublishedProvider";
import RotaTable from "../components/RotaTable";
import Footer from "../components/Generic/Footer";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const { rotas: published } = useContext(PublishedContext);
  const { rotas: unpublished } = useContext(UnpublishedContext);

  if (!published || !unpublished) return null;

  return (
    <Container>
      <h2 className="py-2">Dashboard</h2>

      <h3>{user.admin ? "Published" : "Rotas"}</h3>
      <RotaTable rotas={published} />

      {user.admin && (
        <Fragment>
          <h3>Unpublished</h3>
          <RotaTable rotas={unpublished} />
        </Fragment>
      )}
    </Container>
  );
}

export default Dashboard;
