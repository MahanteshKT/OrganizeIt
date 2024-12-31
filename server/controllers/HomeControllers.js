export const Home = async function (req, res) {
    try {
      res.status(200).json({
        text: 'Hello world'
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};