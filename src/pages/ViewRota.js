import React, { useContext } from "react";
import { format } from "date-fns";
import { Container } from "reactstrap";
import { matchPath } from "react-router";
import { PublishedContext } from "../providers/rota/publishedProvider";
import { UnpublishedContext } from "../providers/rota/unpublishedProvider";
import Rota from "../components/Rota/View/Rota";

function ViewRota({ location }) {
  const { rotas: published } = useContext(PublishedContext);
  const { rotas: unpublished } = useContext(UnpublishedContext);

  if (!published || !unpublished) return null;

  const match = matchPath(location.pathname, {
    path: "/view/:id",
    exact: true,
    strict: false
  });

  const rotas = [...published, ...unpublished];
  const rota = rotas.find(r => r.id === match.params.id);
  const date = format(rota.date, "d MMMM yyyy"); //01 January 1970

  return (
    <Container fluid>
      <h2 className="py-2">{date}</h2>
      <Rota rota={rota} />
    </Container>
  );
}

export default ViewRota;
