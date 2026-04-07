import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';

interface ProductSpecsProps {
  specs: Record<string, string>;
}

const ProductSpecs = ({ specs }: ProductSpecsProps) => {
  const entries = Object.entries(specs);

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
        Teknik{' '}
        <Box
          component="span"
          sx={{
            background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Özellikler
        </Box>
      </Typography>

      <TableContainer
        sx={{
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(14, 14, 22, 0.6)',
          overflow: 'hidden',
        }}
      >
        <Table>
          <TableBody>
            {entries.map(([key, value]) => (
              <TableRow
                key={key}
                sx={{
                  '&:nth-of-type(odd)': {
                    background: 'rgba(255,255,255,0.02)',
                  },
                  '&:last-child td': {
                    borderBottom: 'none',
                  },
                  transition: 'background 0.3s ease',
                  '&:hover': {
                    background: 'rgba(108,99,255,0.05)',
                  },
                }}
              >
                <TableCell
                  sx={{
                    color: 'rgba(255,255,255,0.5)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    borderColor: 'rgba(255,255,255,0.04)',
                    width: '40%',
                    py: 2,
                  }}
                >
                  {key}
                </TableCell>
                <TableCell
                  sx={{
                    color: '#fff',
                    fontWeight: 500,
                    fontSize: '0.85rem',
                    borderColor: 'rgba(255,255,255,0.04)',
                    py: 2,
                  }}
                >
                  {value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductSpecs;
