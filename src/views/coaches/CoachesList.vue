<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <coach-filter @change-filter="setFilters"></coach-filter>
        </section>
        <section>
            <base-card>
                <div class="controls">
                    <base-button mode="outline" @click.native="loadCoaches(true)">
                        Refresh
                    </base-button>
                    <base-button v-if="!isCoach && !isLoading" :to="{ name: 'register' }" link>
                        Register as Coach
                    </base-button>
                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-if="hasCoaches">
                    <coach-item v-for="coach in filteredCoaches" 
                        :key="coach.id"
                        :id="coach.id"
                        :first-name="coach.firstName" 
                        :last-name="coach.lastName"
                        :rate="coach.hourlyRate"
                        :areas="coach.areas" />
                </ul>
                <h3 v-else>No coaches found.</h3>
            </base-card>
        </section>
    </div>
</template> 

<script>
import { mapGetters } from 'vuex';
import CoachItem from '@/components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
    components: { CoachItem, CoachFilter },
    computed: {
        ...mapGetters('coaches', ['coaches', 'hasCoaches']),
        filteredCoaches() {
            return this.coaches.filter(coach => {
                if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true;
                }
                if (this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true;
                }
                if (this.activeFilters.career && coach.areas.includes('career')) {
                    return true;
                }
                return false;
            })
        },
        hasCoaches() { 
            return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        }
    },
    created() {
        this.loadCoaches();
    },
    data() {
        return {
            isLoading: false,
            error: null,
            activeFilters: {
                frontend: true,
                backend: true,
                career: true,
            }
        };
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
        async loadCoaches(refresh = false) {
            this.isLoading = !this.isLoading;
            try {
                await this.$store.dispatch('coaches/loadCoaches', {
                    forceRefresh: refresh,
                });
            } catch (error) {
                this.error = error.message || 'Something went wrong!';
            }
            this.isLoading = !this.isLoading;
        },
        handleError() {
            this.error = null;
        },
    },
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>