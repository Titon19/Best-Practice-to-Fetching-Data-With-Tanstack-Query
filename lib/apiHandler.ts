export async function apiHandler(
  req: Request,
  fn: (req: Request) => Promise<Response>
) {
  try {
    return await fn(req);
  } catch (error: any) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Terjadi kesalahan pada server",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
