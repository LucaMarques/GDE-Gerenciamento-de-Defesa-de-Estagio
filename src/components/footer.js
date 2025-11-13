export function criaFooter() {
    const footer = document.createElement("footer");
    footer.classList.add("footer");
    
    footer.innerHTML = `
        <footer class="footer" id="footer">
            <div class="container-footer">
                <div class="footer-section">
                    <img src="./public/logo.png" alt="Logo GDE">
                    <h2>GDE - Gerenciamento de Defesas de Estágio</h2>
                    <p class="footer-description">
                        Plataforma para organização e acompanhamento de defesas de estágio
                        facilitando o processo para alunos, orientadores e coordenadores.
                    </p>
                </div>
            </div>

            <div class="footer-bottom">
                &copy; 2025 GDE. Todos os direitos reservados.
            </div>
        </footer>
    `;
    return footer;
}