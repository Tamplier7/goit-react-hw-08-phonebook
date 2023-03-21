import { Loader, Spinner, Circle, Face,} from './Preloader.styled';

export const Preloader = () => (
 <Loader>
  <Spinner>
    <Face>
      <Circle />
    </Face>
    <Face>
      <Circle />
    </Face>
  </Spinner>
</Loader>
);