import './FiltersComponent.css';
function FiltersComponent() {
  return (
    <section className="filters">
        <span className="filter active">
            <img src="assets/sparks.webp" alt="" />
            <p>All</p>
        </span>
        <span className="filter">
            <img src="assets/greensmoothies.png" alt="" />
            <p>Green</p>
        </span>
        <span className="filter">
            <img src="assets/pineaple.webp" alt="" />
            <p>Tropical</p>
        </span>
        <span className="filter">
            <img src="assets/berry.webp" alt="" />
            <p>Berry</p>
        </span>
        <span className="filter">
            <img src="assets/proteinshake.webp" alt="" />
            <p>Protein</p>
        </span>
        <span className="filter">
            <img src="assets/leaves.webp" alt="" />
            <p>Detox</p>
        </span>
        <span className="filter">
            <img src="assets/ice-cream.webp" alt="" />
            <p>Dessert</p>
        </span>
    </section>
  )
}

export default FiltersComponent
