export default function formatDate(dateString: string) {
    const date = new Date(dateString);
  
    const day = date.getUTCDate();
    const monthIndex = date.getUTCMonth();
    const year = date.getUTCFullYear();
  
    // Nombres abreviados de los meses en español
    const monthNames = [
      "Ene", "Feb", "Mar", "Abr", "May", "Jun",
      "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
    ];
  
    // Formatear la fecha en el formato deseado
    const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
  
    return formattedDate;
  }