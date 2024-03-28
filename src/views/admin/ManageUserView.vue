<template>
  <Container>
    <div class="py-20">
      <h1 class="text-2xl font-semibold mb-8">Utilisateurs</h1>
      <div class="sm:flex items-center sm:justify-between">
        <p class="text-neutral-500 mb-4 sm:mb-0">
          Nombre d'utilisateurs : {{ userNb }}
        </p>
        <Dialog>
          <DialogTrigger as-child>
            <Button
              ><Plus :size="20" :stroke-width="1.5" class="mr-2" /> Ajouter un
              utilisateur</Button
            >
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter un utilisateur</DialogTitle>
              <DialogDescription>
                Créez un nouvel utilisateur en remplissant les informations
              </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div>
                <label for="email" class="block text-sm font-semibold mb-1"
                  >E-mail</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  class="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label for="password" class="block text-sm font-semibold mb-1"
                  >Mot de passe</label
                >
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  class="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label for="first-name" class="block text-sm font-semibold mb-1"
                  >Prénom</label
                >
                <input
                  type="text"
                  id="first-name"
                  v-model="firstName"
                  class="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label for="last-name" class="block text-sm font-semibold mb-1"
                  >Nom</label
                >
                <input
                  type="text"
                  id="last-name"
                  v-model="lastName"
                  class="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label for="phone" class="block text-sm font-semibold mb-1"
                  >Téléphone</label
                >
                <input
                  type="tel"
                  id="phone"
                  v-model="phone"
                  class="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
            <DialogFooter class="gap-y-2">
              <Button type="submit" variant="secondary" @click="createAdmin">
                Créer un administrateur
              </Button>
              <Button type="submit" @click="createUser">
                Créer un utilisateur
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
    <div>
      <!-- input with search icon -->
      <div class="relative text-neutral-500 w-full sm:w-96 mb-4">
        <Search class="absolute top-2.5 left-2.5" :size="22" />
        <input
          type="text"
          class="w-full sm:w-96 p-2 pl-10 border rounded-lg"
          placeholder="Rechercher un utilisateur"
          v-model="search"
        />
      </div>
      <Loading v-if="loading" />
      <Table v-else>
        <TableHeader>
          <TableRow>
            <TableHead class="text-left">ID</TableHead>
            <TableHead class="text-left">Email</TableHead>
            <TableHead class="text-left">Nom</TableHead>
            <TableHead class="text-left">Prénom</TableHead>
            <TableHead class="text-left">Role</TableHead>
            <TableHead class="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="user in users" :key="user.id">
            <TableCell>{{ user.id }}</TableCell>
            <TableCell class="font-medium">{{ user.email }}</TableCell>
            <TableCell>{{ user.last_name }}</TableCell>
            <TableCell>{{ user.first_name }}</TableCell>
            <TableCell>
              <span
                v-if="user.role.includes('ROLE_ADMIN')"
                class="bg-red-500 text-white px-2 py-1 rounded-full"
                >Admin</span
              >
              <span
                v-else
                class="bg-green-500 text-white px-2 py-1 rounded-full"
                >User</span
              >
            </TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger as-child>
                  <Button variant="ghost" size="icon"
                    ><Pencil :size="20" :stroke-width="1.5"
                  /></Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Modifier l'utilisateur</DialogTitle>
                    <DialogDescription>
                      Modifiez les informations de {{ user.email }}
                    </DialogDescription>
                  </DialogHeader>
                  <div class="grid gap-4 py-4">
                    <div>
                      <label
                        for="first-name"
                        class="block text-sm font-semibold mb-1"
                        >Prénom</label
                      >
                      <input
                        type="text"
                        id="first-name"
                        :value="user.first_name"
                        class="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label
                        for="last-name"
                        class="block text-sm font-semibold mb-1"
                        >Nom</label
                      >
                      <input
                        type="text"
                        id="last-name"
                        :value="user.last_name"
                        class="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label
                        for="phone"
                        class="block text-sm font-semibold mb-1"
                        >Téléphone</label
                      >
                      <input
                        type="tel"
                        id="phone"
                        :value="user.phone_number"
                        class="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" @click="updateUser(user.id)">
                      Sauvegarder
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger as-child>
                  <Button variant="ghost" size="icon">
                    <Trash2 :size="20" :stroke-width="1.5" />
                  </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Supprimer l'utilisateur</DialogTitle>
                    <DialogDescription>
                      Êtes-vous sûr de vouloir supprimer {{ user.email }} ?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="destructive" @click="deleteUser(user.id)">
                      Supprimer
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </Container>
</template>

<script setup>
import Container from "@/components/Container.vue";
import Loading from "@/components/Loading.vue";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
import { Pencil, Trash2, Plus, Search } from "lucide-vue-next";
import { ref, onMounted, watch } from "vue";

const loading = ref(false);

const users = ref([]);
const userNb = ref(0);
const search = ref("");

const firstName = ref("");
const lastName = ref("");
const phone = ref("");
const email = ref("");
const password = ref("");

const { toast } = useToast();

const getUsers = () => {
  loading.value = true;

  fetch(`${import.meta.env.VITE_API}/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      users.value = data;
      userNb.value = data.length;
      loading.value = false;
      console.log(data);
    });
};

const createUser = () => {
  fetch(`${import.meta.env.VITE_API}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
      first_name: firstName.value,
      last_name: lastName.value,
      phone_number: phone.value,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la création de l'utilisateur",
          variant: "destructive",
        });
        throw new Error("Erreur lors de la création de l'utilisateur");
      }
      return res.json();
    })
    .then((data) => {
      toast({
        title: "Succès",
        description: "Utilisateur créé avec succès",
      });
      getUsers();
    });
};

const createAdmin = () => {
  fetch(`${import.meta.env.VITE_API}/admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
      first_name: firstName.value,
      last_name: lastName.value,
      phone_number: phone.value,
      admin_code: "admin_code",
    }),
  })
    .then((res) => {
      if (!res.ok) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la création de l'administrateur",
          variant: "destructive",
        });
        throw new Error("Erreur lors de la création de l'administrateur");
      }
      return res.json();
    })
    .then((data) => {
      toast({
        title: "Succès",
        description: "Administrateur créé avec succès",
      });
      getUsers();
    });
};

const updateUser = (id) => {
  fetch(`${import.meta.env.VITE_API}/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      first_name: document.getElementById("first-name").value,
      last_name: document.getElementById("last-name").value,
      phone_number: document.getElementById("phone").value,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la mise à jour de l'utilisateur",
          variant: "destructive",
        });
        throw new Error("Erreur lors de la mise à jour de l'utilisateur");
      }
      return res.json();
    })
    .then((data) => {
      toast({
        title: "Succès",
        description: "Utilisateur mis à jour avec succès",
      });
      getUsers();
    });
};

const deleteUser = (id) => {
  fetch(`${import.meta.env.VITE_API}/user/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression de l'utilisateur",
          variant: "destructive",
        });
        throw new Error("Erreur lors de la suppression de l'utilisateur");
      }
      return res.json();
    })
    .then((data) => {
      toast({
        title: "Succès",
        description: "Utilisateur supprimé avec succès",
      });
      getUsers();
    });
};

onMounted(() => {
  getUsers();
});

watch(search, (value) => {
  if (value === "") {
    getUsers();
  } else {
    loading.value = true;
    fetch(`${import.meta.env.VITE_API}/user?email=${value}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        users.value = data;
        userNb.value = data.length;
        loading.value = false;
      });
  }
});
</script>
