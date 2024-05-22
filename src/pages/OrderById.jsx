import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import useAuthStore from '../store/useAuthStore';
import capFirst from '../utils/capFirst';

export default function OrderById() {
  const {
    id,
    city,
    street,
    user: { firstName, lastName, email },
    orderProducts,
    createdAt,
  } = useAuthStore(state => state.orderResponse);

  const totalPrice = orderProducts
    ?.reduce((acc, cv) => acc + cv?.product?.price * cv?.quantity, 0)
    .toFixed(2);

  return (
    <>
      <Typography variant='subtitle2' color='text.secondary'>
        Order id: {id}
      </Typography>
      <Typography variant='h4' gutterBottom>
        Order Information
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText sx={{ mr: 2 }} primary={'Created at:'} secondary={''} />
          <Typography variant='body1' fontWeight='medium'>
            {new Date(createdAt).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            })}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText sx={{ mr: 2 }} primary={'First name:'} secondary={''} />
          <Typography variant='body1' fontWeight='medium'>
            {capFirst(firstName)}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText sx={{ mr: 2 }} primary={'Last name:'} secondary={''} />
          <Typography variant='body1' fontWeight='medium'>
            {capFirst(lastName)}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText sx={{ mr: 2 }} primary={'Email:'} secondary={''} />
          <Typography variant='body1' fontWeight='medium'>
            {email}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText sx={{ mr: 2 }} primary={'Street:'} secondary={''} />
          <Typography variant='body1' fontWeight='medium'>
            {street}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText sx={{ mr: 2 }} primary={'City:'} secondary={''} />
          <Typography variant='body1' fontWeight='medium'>
            {city}
          </Typography>
        </ListItem>
        {orderProducts?.map(
          ({ product: { id: productId, name, price }, quantity }) => (
            <ListItem sx={{ py: 1, px: 0 }} key={productId}>
              <ListItemText
                sx={{ mr: 2 }}
                primary={name}
                secondary={`price: $${price}`}
              />
              <Typography variant='body1' fontWeight='medium'>
                {quantity}
              </Typography>
            </ListItem>
          ),
        )}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            sx={{ mr: 2 }}
            primary={'Total price:'}
            secondary={''}
          />
          <Typography variant='body1' fontWeight='medium'>
            $ {totalPrice}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}
