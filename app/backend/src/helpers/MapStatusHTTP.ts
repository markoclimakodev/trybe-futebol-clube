export default function mapStatusHTTP(status: string): number {
  const statusCodes: Record<string, number> = {
    success: 200,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
  };

  return statusCodes[status] || 500;
}
