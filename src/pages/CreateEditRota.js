import React, {
  useContext
} from 'react'
import { matchPath } from 'react-router'
import { Container } from 'reactstrap';
import Rota from '../components/Rota/CreateEdit/Rota';
import { StaffContext } from '../providers/staffProvider';
import { PublishedContext } from '../providers/rota/publishedProvider';
import { UnpublishedContext } from '../providers/rota/unpublishedProvider';

function CreateEditRota({ location }) {
  const { staff } = useContext(StaffContext);
  const { rotas: published } = useContext(PublishedContext);
  const { rotas: unpublished } = useContext(UnpublishedContext);

  if (!staff || !published || !unpublished) return null;

  const rotas = [...published, ...unpublished];

  const match = matchPath(location.pathname, {
    path: '/rota/:id',
    exact: true,
    strict: false
  });

  const rota = {
    date: new Date(),
    notes: "",
    events: Array(7).fill(""),
    published: false,
    body: {}
  };
  staff.forEach(employee => {
    rota.body[employee.uid] = {
      uid: employee.uid,
      name: {...employee.name},
      schedule: Array(7).fill("")
    }
    });

  return (
    <Container fluid className="pb-1">
      <h2 className="pt-2">{match ? 'Edit' : 'New'} Rota</h2>
      {match
        ? <Rota editing rota={rotas.find(r => r.id === match.params.id)} />
        : <Rota rota={rota} />
      }
    </Container>
  );
}

export default CreateEditRota;
