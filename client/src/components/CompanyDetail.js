import { useParams } from "react-router";
import { getCompany } from "../graphql/queries";
import { useEffect, useState } from "react";

function CompanyDetail() {
  const { companyId } = useParams();

  const [company, setCompany] = useState(null);

  useEffect(() => {
    getCompany(companyId).then((company) => setCompany(company));
  }, [companyId]);

  if (!company) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
    </div>
  );
}

export default CompanyDetail;
