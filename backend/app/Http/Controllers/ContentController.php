<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\PricingPlan;
use App\Models\Feature;
use App\Models\Testimonial;
use App\Models\Faq;
use App\Models\Setting;
use Illuminate\Http\Request;

class ContentController extends Controller
{
    /**
     * Get all landing page content.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $language = $request->input('language', 'en');

        // Validate language
        if (!in_array($language, ['en', 'ar'])) {
            $language = 'en';
        }

        try {
            $content = [
                'services' => Service::active()
                    ->language($language)
                    ->ordered()
                    ->get()
                    ->map(function ($service) {
                        return [
                            'id' => $service->id,
                            'title' => $service->title,
                            'slug' => $service->slug,
                            'icon' => $service->icon,
                            'description' => $service->description,
                            'features' => $service->features,
                        ];
                    }),

                'pricing' => PricingPlan::active()
                    ->language($language)
                    ->ordered()
                    ->get()
                    ->map(function ($plan) {
                        return [
                            'id' => $plan->id,
                            'name' => $plan->name,
                            'slug' => $plan->slug,
                            'description' => $plan->description,
                            'price_monthly' => (float) $plan->price_monthly,
                            'price_yearly' => (float) $plan->price_yearly,
                            'features' => $plan->features,
                            'is_popular' => $plan->is_popular,
                        ];
                    }),

                'features' => Feature::active()
                    ->language($language)
                    ->ordered()
                    ->get()
                    ->map(function ($feature) {
                        return [
                            'id' => $feature->id,
                            'title' => $feature->title,
                            'description' => $feature->description,
                            'icon' => $feature->icon,
                        ];
                    }),

                'testimonials' => Testimonial::active()
                    ->language($language)
                    ->ordered()
                    ->get()
                    ->map(function ($testimonial) {
                        return [
                            'id' => $testimonial->id,
                            'client_name' => $testimonial->client_name,
                            'client_position' => $testimonial->client_position,
                            'client_company' => $testimonial->client_company,
                            'client_avatar' => $testimonial->client_avatar,
                            'testimonial' => $testimonial->testimonial,
                            'rating' => $testimonial->rating,
                        ];
                    }),

                'faq' => Faq::active()
                    ->language($language)
                    ->ordered()
                    ->get()
                    ->map(function ($faq) {
                        return [
                            'id' => $faq->id,
                            'question' => $faq->question,
                            'answer' => $faq->answer,
                            'category' => $faq->category,
                        ];
                    }),

                'settings' => Setting::getGroupedForLanguage($language),
            ];

            return response()->json([
                'success' => true,
                'language' => $language,
                'data' => $content
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch content',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
}
