function Footer() {
    return <footer className="page-footer indigo darken-3">
        <div className="footer-copyright">
        <div className="container">
        © {new Date().getFullYear()} Copyright Text
        <a className="grey-text text-lighten-4 right" href="https://github.com/Ivan19979/05-movie">GitHub project</a>
        </div>
        </div>
    </footer>
}

export {Footer};