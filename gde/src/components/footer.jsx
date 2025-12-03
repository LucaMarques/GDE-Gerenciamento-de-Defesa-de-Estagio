import "../css/base.css";

export default function Footer() {
   return (
        <>
            <div className="container-footer">
                <div className="footer-section">
                    <img src="./logo.png" alt="Logo GDE" />
                    <h2>GDE - Gerenciamento de Defesas de Estágio</h2>
                    <p className="footer-description">
                        Plataforma para organização e acompanhamento de defesas de estágio
                        facilitando o processo para alunos, orientadores e coordenadores.
                    </p>
                </div>
            </div>

            <div className="footer-bottom">
                &copy; 2025 GDE. Todos os direitos reservados.
            </div>
        </>
    );
}
