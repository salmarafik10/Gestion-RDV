export default function RdvStep2({ onBack }) {
  return (
    <div className="rdv-step1-bg">
      <div className="rdv-step1-form text-center">
        <p className="text-danger mb-4">
          The service you want is not available at the moment.
        </p>
        <button className="btn btn-outline-dark" onClick={onBack}>Go Back</button>
      </div>
    </div>
  );
}