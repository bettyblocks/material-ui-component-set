function Logout(): void {
  localStorage.removeItem('TOKEN');
  localStorage.removeItem('REFRESH_TOKEN');
}
