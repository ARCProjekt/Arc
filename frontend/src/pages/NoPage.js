export default function NoPage() {
  return (
    <div className="summary-section nopage">
      <div className="cont">
        <div>
          <img
            src={process.env.PUBLIC_URL + "/kepek/nopage_404.png"}
            alt="Page not Found"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
