export default async function importModule(path) {
  try {
    const module = await import(path)
    return module
  } catch (error) {
      console.error('import failed');
  }
}