'use client';

import PurelyLoader from "@/components/purelyLoadingAnimation";
import profileService from "@/services/profile";
import { useEffect, useState } from "react";
import ErrorMessage from "@/components/error/errorText";
import SearchableSelect from "../../app/me/profileCard/searchableSelect";
import Select from "@/components/select/select";
import PromptCard from "../../app/me/profileCard/promptCard";
import ImageLayout from "../../app/me/profileCard/imageLayout";
import useDebounce from "@/components/hooks/useDebounce";
import LocationSearch from "@/components/location/locationSearch";
import DistanceStepper from "@/components/distanceStepperSlider";

const UpsertProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState<Record<string, any>>({});
    const [name, setName] = useState((profile["name"] || '').length ? profile["name"] : undefined);

    const [prompts, setPrompts] = useState<Array<{
        id: string,
        label: string,
        isUsed: boolean
    }>>([]);
    const [genders, setGenders] = useState<Array<{
        id: string,
        label: string,
        isUsed: boolean
    }>>([]);

    const fetchPrompts = async () => {
        const prompts = await profileService.getPrompts({
            category: 'date',
        });
        if (prompts.records.length) {
            setPrompts(prompts.records.map((p: any) => ({
                id: p.id,
                label: p.label,
                isUsed: false
            })))
        }
    }
    const fetchGenders = async () => {
        const genders = await profileService.getGenders();
        if (genders.records.length) {
            setGenders(genders.records.map((p: any) => ({
                id: p.id,
                label: p.label
            })))
        }
    }

    const fetchProfile = async () => {
        const currentProfile = await profileService.getSelfProfile();
        setProfile(currentProfile);
    }

    const debouncedSetProfile = useDebounce((key: string, value: any) => {
        setProfile((prevProfile) => ({ ...prevProfile, [key]: value }));
    }, 300); 

    useEffect(() => {
        fetchProfile();
        fetchPrompts();
        fetchGenders();
    }, []);

    const upsertProfile = async () => {
        try {
            await profileService.upsertProfile({
                data: profile,
                purpose: 'date'
            });
        }
        catch (error) {
            console.log("Error creating profile:", error);
        }
    }


    useEffect(() => {
        console.log('Current profile data', profile);
        upsertProfile();
        setName(profile["name"] || undefined);
    }, [profile]);

    return (
        <main className="flex flex-col min-h-screen items-center justify-center gap-5">
            {isLoading ? (
                <PurelyLoader />
            ) : (
                <div className="flex flex-col gap-5">
                    <h1>Let us know a little bit about you</h1>
                    <div key="name" className="flex flex-col gap-5">
                        <label htmlFor="name" className="block font-medium">
                            You can call me
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Anay"
                            className="mt-1 block w-full p-5 border-b-2 border-overBackgroundOutline focus:border-overBackgroundOutlinePrimary outline-none"
                            onChange={(e) => {
                                debouncedSetProfile('name', e.target.value);
                                setName(e.target.value);
                            }}
                            value={name}
                        />
                        <ErrorMessage message={''} />
                    </div>
                    <SearchableSelect id="" options={genders}
                        defaultOptionIds={[
                            genders?.[0]?.id,
                            genders?.[1]?.id
                        ]}
                        defaultId={profile['gender']}
                        title="I am"
                        onChange={(id) => setProfile({ ...profile, gender: id })}
                    />
                    <SearchableSelect id="lookingFor" options={genders}
                        defaultOptionIds={[
                            genders?.[0]?.id,
                            genders?.[1]?.id
                        ]}
                        defaultId={profile['lookingFor']}
                        title="I am looking for a" 
                        onChange={(id) => setProfile({ ...profile, lookingFor: id })}
                    />
                    <Select id="hereFor" options={
                        [
                            {
                                id: 'relationship',
                                label: 'Relationship',
                                value: 'relationship'
                            },
                            {
                                id: 'notSureYet',
                                label: 'Not sure yet',
                                value: 'notSureYet'
                            }
                        ]
                    }
                        label="I am here for"
                        value={profile['hereFor'] || undefined}
                        onChange={(e) => e?.target?.value ? ['relationship', 'notSureYet'].includes(e?.target?.value) && setProfile({ ...profile, hereFor: e.target.value }) : (() => {})()}
                        dummySelectLabel="Select one and let us know"
                    />
                    <div className="w-full flex flex-col gap-5 bg-re">
                        <label htmlFor="bio">
                            Bio
                        </label>
                        <textarea placeholder={profile?.['bio'] || 'You can express yourself here'} value = {profile?.['bio'] || undefined} name="bio" id="bio" className=" placeholder:text-gray-500 p-5 w-full outline-none resize-none border-2 border-overBackgroundOutline rounded-lg text-overBackground"  
                       onChange={(e) => debouncedSetProfile('bio', e.target.value)} />
                    </div>
                    <div className="w-full flex flex-col gap-5">
                        <label>Prompts</label>
                        <div className="w-full flex flex-col gap-5">
                            {Array.from({ length: 3 }).map((_, index) => {
                                const selectedPrompts = profile.prompts || [];
                                const selectedPrompt = selectedPrompts[index] || {}; 
                                const selectedPromptIds = selectedPrompts.map((pt: any) => pt?.id);

                                const availablePrompts = prompts.filter(
                                    (p) =>
                                        !selectedPromptIds.includes(p?.id) || 
                                        selectedPrompt.id === p?.id
                                );
                                return (
                                    <PromptCard
                                        key={`prompt-${index}`}
                                        id={`prompt${index + 1}`}
                                        promptPlaceholder={`Prompt ${index + 1}`}
                                        prompts={availablePrompts}
                                        answer={selectedPrompt.answer || ''}
                                        selectedPromptId={selectedPrompt.id || ''}
                                        setSelectedPrompt={(promptId: string) => {
                                            setProfile((prevProfile) => {
                                                const updatedPrompts = [...(prevProfile.prompts || [])];

                                                updatedPrompts[index] = {
                                                    ...(prompts.find((p) => p?.id === promptId) || {}),
                                                    answer: updatedPrompts[index]?.answer || '',
                                                };

                                                return { ...prevProfile, prompts: updatedPrompts };
                                            });
                                        }}
                                        setPromptAnswer={(answer: string, promptId: string) => {
                                            setProfile((prevProfile) => {
                                                const updatedPrompts = [...(prevProfile.prompts || [])];

                                                updatedPrompts[index] = {
                                                    ...(prompts.find((p) => p?.id === promptId) || {}),
                                                    answer,
                                                };
                                                return { ...prevProfile, prompts: updatedPrompts };
                                            });
                                        }}
                                    />
                                );
                            })}
                        </div>

                    </div>
                    <div>
                        <ImageLayout count={4} title="Pictures" />
                    </div>
                    <LocationSearch title="Help us find matches nearest to you" handleLocationSelect={(locationLabel: string, lat: number, lng: number) => {
                            setProfile({...profile, location: {lat, lng }, locationLabel: locationLabel });
                        }}
                        locationLabel={profile?.["locationLabel"]}
                    />
                    <DistanceStepper initialValue={profile['preferredMatchDistance'] || 10} min={10} max={80} label={`Select distance you want us to look for matches in kms`} unit="Kms" step={5} onChange={(distance: number) => debouncedSetProfile('preferredMatchDistance', distance)}/>
                </div>
            )}
        </main>
    );
};

export default UpsertProfile;
