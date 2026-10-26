import searchIcon from '../../assets/icons/Buscar.svg'
import notificationIcon from '../../assets/icons/Notificacion.svg'
import arrowIcon from '../../assets/icons/Icono enter.svg'
import noiseTexture from '../../assets/icons/Noise-Animation.png'
import ellipseOne from '../../assets/icons/Ellipse 259.svg'
import ellipseTwo from '../../assets/icons/Ellipse 260.svg'
import ellipseThree from '../../assets/icons/Ellipse 261.svg'
import ellipseFour from '../../assets/icons/Ellipse 264.svg'

function IconButton({ label, icon, type = 'button' }) {
  return (
    <button type={type} className="icon-button" aria-label={label}>
      <img src={icon} alt="" />
    </button>
  )
}

function HomeScreen() {
  return (
    <main className="home-screen">
      <div
        className="noise-layer"
        aria-hidden="true"
        style={{ backgroundImage: `url(${noiseTexture})` }}
      />

      <div className="background-orb orb-left" aria-hidden="true">
        <img src={ellipseOne} alt="" />
      </div>
      <div className="background-orb orb-middle" aria-hidden="true">
        <img src={ellipseThree} alt="" />
      </div>
      <div className="background-orb orb-right" aria-hidden="true">
        <img src={ellipseTwo} alt="" />
      </div>
      <div className="background-orb orb-far" aria-hidden="true">
        <img src={ellipseFour} alt="" />
      </div>

      <header className="topbar">
        <h1>Bienvenido</h1>

        <div className="top-actions" aria-label="Acciones del usuario">
          <IconButton label="Buscar" icon={searchIcon} />
          <IconButton label="Notificaciones" icon={notificationIcon} />
        </div>
      </header>

      <section className="home-content" aria-label="Pantalla principal">
        <div className="headline-block">
          <h2>Tus pensamientos viven aquí</h2>
          <p>Comienza por escribir tu primera nota...</p>
        </div>

        <button type="button" className="compose-bar" aria-label="Comenzar a escribir">
          <span>Comienza a escribir...</span>
          <span className="compose-arrow">
            <img src={arrowIcon} alt="" />
          </span>
        </button>
      </section>
    </main>
  )
}

export default HomeScreen
