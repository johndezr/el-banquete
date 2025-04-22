// import { SearchInput } from '@/components/search-input';
import { CardGuest } from '@/components/card-guest';
import { getGuests } from '@/services/guest';

export default async function Home() {
  const guests = await getGuests({ search: '' });

  return (
    <section className="container mx-auto max-w-screen-xl p-4">
      {/* <SearchInput /> */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {guests.map((guest) => (
          <CardGuest key={guest.id} guest={guest} />
        ))}
      </div>
    </section>
  );
}
