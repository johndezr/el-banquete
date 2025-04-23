// import { SearchInput } from '@/components/search-input';
import { CardGuest } from '@/components/card-guest';
import { getAllGuests } from '@/services/guest';
import { Guest } from '@prisma/client';
export default async function Home() {
  const guests = await getAllGuests();

  return (
    <section className="container mx-auto max-w-screen-xl p-4">
      {/* <SearchInput /> */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {guests.map((guest: Guest) => (
          <article key={guest.id}>
            <CardGuest guest={guest} />
          </article>
        ))}
      </div>
    </section>
  );
}
