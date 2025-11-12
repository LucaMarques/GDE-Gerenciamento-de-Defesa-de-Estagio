import { getFromStorage } from "../utils/storage";
import { criarLinhaRelatorio } from "../components/linha.relatorio";

export function renderRelatoriosPages() {
  const todasDefesas = getFromStorage("Defesasas") || [];
  const todosUsuários = getFromStorage("usuarios") || [];
}
